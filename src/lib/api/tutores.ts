import { apiClient } from "./client";
import type { ApiTutor, ApiTutorDetail, ApiFoto, CreateTutorPayload, UpdateTutorPayload, PaginatedResponse, TutorsListParams } from "./types";

export async function getTutors(params: TutorsListParams = {}): Promise<PaginatedResponse<ApiTutor>> {
	const searchParams = new URLSearchParams();

	if (params.page !== undefined) searchParams.set("page", String(params.page));
	if (params.size) searchParams.set("size", String(params.size));
	if (params.nome) searchParams.set("nome", params.nome);

	const query = searchParams.toString();
	const endpoint = `/v1/tutores${query ? `?${query}` : ""}`;

	return apiClient<PaginatedResponse<ApiTutor>>(endpoint);
}

export async function getTutorById(id: number): Promise<ApiTutorDetail> {
	return apiClient<ApiTutorDetail>(`/v1/tutores/${id}`);
}

export async function createTutor(data: CreateTutorPayload): Promise<ApiTutorDetail> {
	return apiClient<ApiTutorDetail>("/v1/tutores", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function updateTutor(id: number, data: UpdateTutorPayload): Promise<ApiTutorDetail> {
	return apiClient<ApiTutorDetail>(`/v1/tutores/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}

export async function uploadTutorPhoto(id: number, file: File): Promise<ApiFoto> {
	const formData = new FormData();
	formData.append("foto", file);

	return apiClient<ApiFoto>(`/v1/tutores/${id}/fotos`, {
		method: "POST",
		body: formData,
	});
}

export async function linkPetToTutor(tutorId: number, petId: number): Promise<void> {
	return apiClient<void>(`/v1/tutores/${tutorId}/pets/${petId}`, {
		method: "POST",
	});
}

export async function unlinkPetFromTutor(tutorId: number, petId: number): Promise<void> {
	return apiClient<void>(`/v1/tutores/${tutorId}/pets/${petId}`, {
		method: "DELETE",
	});
}
