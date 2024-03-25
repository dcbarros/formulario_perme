import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { MeasurementRepository } from './repositories/measurement.repository';
import { PhysiotherapistRepository } from 'src/physiotherapist/repositories/physiotherapist.repository';
import { AdmissionRepository } from 'src/admission/repositories/admission.repository';

@Injectable()
export class MeasurementService {
  constructor(
    private readonly measurementRepository: MeasurementRepository,
    private readonly admissionRepository: AdmissionRepository,
    private readonly physiotherapistRepository: PhysiotherapistRepository,
  ) {}

  async create(createMeasurementDto: CreateMeasurementDto) {
    const admission = await this.admissionRepository.findById(
      createMeasurementDto.admissionId,
    );
    const physiotherapist = await this.physiotherapistRepository.findById(
      createMeasurementDto.physioId,
    );

    if (!admission) {
      throw new NotFoundException('Admissão não encontrada');
    }
    if (!physiotherapist) {
      throw new NotFoundException('Fisioterapeuta não encontrado');
    }

    const measurement =
      this.measurementRepository.addMeasurement(createMeasurementDto);
    return measurement;
  }

  async findAll() {
    return this.measurementRepository.findAll();
  }

  async findOne(id: number) {
    const measurement = await this.measurementRepository.findById(id);
    if (!measurement) {
      throw new NotFoundException('Medição não encontrada');
    }

    return measurement;
  }

  async getCombinedData(id: number) {
    await this.findOne(id);
    const measurements = await this.measurementRepository.find({
      where: { id },
      relations: ['admission', 'admission.patient', 'physiotherapist'],
    });

    return {
      admission: measurements.map((measurement) => measurement.admission),
      patient: measurements.map((measurement) => measurement.admission.patient),
      measurement: measurements,
      physiotherapist: measurements.map(
        (measurement) => measurement.physiotherapist,
      ),
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.measurementRepository.removeById(id);
  }
}
