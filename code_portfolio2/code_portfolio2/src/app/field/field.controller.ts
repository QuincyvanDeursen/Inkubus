import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards
} from '@nestjs/common';


import { Field } from './field.schema';
import { FieldService } from './field.service';
import { HasRoles } from 'src/roles/roles.decorator';
import { Role } from '../models/auth.model';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('field')
@UseGuards(RolesGuard)
export class FieldController {
	constructor(private readonly fieldService: FieldService) { }

	// ##### User #####

	@Post()
	@UseGuards(RolesGuard)
	@HasRoles(Role.Admin)
	async createField(@Body() newField: Field): Promise<Field> {
		return await this.fieldService.createField(newField);
	}

	@Put(':id')
	@UseGuards(RolesGuard)
	@HasRoles(Role.Admin)
	async editField(
		@Param('id') id: string,
		@Body() newField: Field,
	): Promise<Field> {
		return await this.fieldService.editField(id, newField);
	}

	@Get()
	async getAllFields(): Promise<Field[]> {
		return await this.fieldService.getAllFields();
	}

	@Get(':id')
	async getFieldById(@Param('id') id: string): Promise<Field> {
		return await this.fieldService.getFieldById(id);
	}

	@Get(':id/category')
	async getFieldByIdWithCategory(@Param('id') id: string): Promise<Field> {
		return await this.fieldService.getFieldByIdWithCategory(id);
	}

	@Delete(':id')
	@UseGuards(RolesGuard)
	@HasRoles(Role.Admin)
	async deleteField(@Param('id') id: string): Promise<Field> {
		return await this.fieldService.deleteField(id);
	}
}
