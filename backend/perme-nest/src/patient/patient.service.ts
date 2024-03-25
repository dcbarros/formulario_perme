import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepository } from './repositories/patient.repository';
import { DuplicateCodeException } from './exceptions/duplicate-code.exception';
import { MeasurementRepository } from 'src/measurement/repositories/measurement.repository';


@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly measurementRepository: MeasurementRepository
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const isInternalCodeAvailable =
      await this.patientRepository.isInternalCodeAvailable(
        createPatientDto.internalCode,
      );
    if (!isInternalCodeAvailable) {
      throw new DuplicateCodeException();
    }
    return this.patientRepository.addPatient(createPatientDto);
  }

  findAll() {
    return this.patientRepository.findAll();
  }

  async findOneById(id: number) {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }
    return patient;
  }

  async findOneByInternalCode(internalCode: string) {
    const patient =
      await this.patientRepository.findByInternalCode(internalCode);
    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }
    return patient;
  }

  async update(id: number, data: UpdatePatientDto) {
    await this.findOneById(id);
    const patientUpdated = await this.patientRepository.updateOne(id, data);
    return patientUpdated;
  }

  async remove(id: number) {
    await this.findOneById(id);

    return this.patientRepository.removeById(id);
  }

  async getCombinedData(id: number) {
    await this.findOneById(id);
    const patients = await this.patientRepository.find({
      where: { id },
      relations: ['admissions'],
    });

    for (const patient of patients) {
      for (const admission of patient.admissions) {
        admission.measurements = await this.measurementRepository.find({
          where: { admission: { id: admission.id } },
        });
      }
    }

    return patients;
  }

  async getPatientInfoByDashboard(id: number) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: [
        'admissions',
        'admissions.measurements',
        'admissions.measurements.physiotherapist',
      ],
    });
    if (!patient) {
      return null;
    }

    return {
      patientName: patient.fullName,
      patientIdentifier: patient.internalCode,
      patientEntry: patient.entryDate,
      measurements: patient.admissions.flatMap((admission) => {
        return admission.measurements.map((measurement) => {
          return {
            physiotherapistName: measurement.physiotherapist.name,
            physiotherapistId: measurement.physiotherapist.identifier,
            hospitalSector: measurement.hospitalSector,
            scoreTitle: measurement.scoreTitle,
            score: measurement.score,
            dataMeasurement: measurement.createdAt,
          };
        });
      }),
    };
  }

}
