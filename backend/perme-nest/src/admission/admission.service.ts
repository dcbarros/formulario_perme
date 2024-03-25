import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { PatientRepository } from 'src/patient/repositories/patient.repository';
import { AdmissionRepository } from './repositories/admission.repository';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { IsNull, Not, OrderByCondition } from 'typeorm';

@Injectable()
export class AdmissionService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly admissionRepository: AdmissionRepository,
  ) {}

  async create(data: CreateAdmissionDto) {
    const patient = await this.patientRepository.findById(
      data.patientId,
    );

    if (!patient) {
      throw new NotFoundException('Admissão não encontrada');
    }

    const admission = this.admissionRepository.addAdmission(data);
    return admission;
  }

  async findAll() {
    return this.admissionRepository.findAll();
  }

  async findOne(id: number) {
    const admission = await this.admissionRepository.findById(id);
    if (!admission) {
      throw new NotFoundException('Admissão não encontrada');
    }

    return admission;
  }

  async update(id: number, data: UpdateAdmissionDto) {
    await this.findOne(id);

    const admissionUpdated = await this.admissionRepository.updateOne(id, data);

    return admissionUpdated;
  }

  async getAllActivePatient(){
    await this.findAll();
    const admissionActive = await this.admissionRepository.find({
      relations: ['patient'],
      where: {
        dischargedAt: Not(IsNull()),
      }
    })

    return admissionActive.map((admissions) => {
      return{
        patient: admissions.patient,
        dischagedAt: admissions.dischargedAt,
        dischagedType: admissions.dischargedType,
      }
    })
  }

  async getAllPatientsInformation(limit: number, offset: number) {
    await this.findAll();
    const admission = await this.admissionRepository.find({
      relations: ['patient', 'measurements', 'measurements.physiotherapist'],
      skip: offset,
      take: limit,
    });

    return admission
      .filter((data) => data.measurements.length > 0)
      .map((data) => {

        const sortedMeasurements = data.measurements.sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : 1,
        );

        return {
          patientName: data.patient.fullName,
          patientInternalCode: data.patient.internalCode,
          dischargedAt: data.dischargedAt,
          measurement: {
            latestMeasurementData: sortedMeasurements[0].createdAt,
            latestMeasurementScore: sortedMeasurements[0].score,
            latestMeasurementScoreTitle: sortedMeasurements[0].scoreTitle,
            latestMeasurementHospitalSector:
              sortedMeasurements[0].hospitalSector,
            latestMeasurementPhysioName:
              sortedMeasurements[0].physiotherapist.name +
              ' ' +
              sortedMeasurements[0].physiotherapist.lastName,
            latestMeasurementPhysioId:
              sortedMeasurements[0].physiotherapist.identifier,
          },
        };
      });
  }
}
