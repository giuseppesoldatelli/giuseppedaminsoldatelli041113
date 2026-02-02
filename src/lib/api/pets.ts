import { apiClient } from "./client";
import type { ApiPet, ApiFoto, PaginatedResponse, PetsListParams, UpdatePetPayload, CreatePetPayload } from "./types";

export async function getPets(params: PetsListParams = {}): Promise<PaginatedResponse<ApiPet>> {
	const searchParams = new URLSearchParams();

	if (params.page) searchParams.set("page", String(params.page));
	if (params.size) searchParams.set("size", String(params.size));
	if (params.nome) searchParams.set("nome", params.nome);

	const query = searchParams.toString();
	const endpoint = `/v1/pets${query ? `?${query}` : ""}`;

	return apiClient<PaginatedResponse<ApiPet>>(endpoint);
}

export async function getPetById(id: number): Promise<ApiPet> {
	return apiClient<ApiPet>(`/v1/pets/${id}`);
}

export async function updatePet(id: number, data: UpdatePetPayload): Promise<ApiPet> {
	return apiClient<ApiPet>(`/v1/pets/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}

export async function createPet(data: CreatePetPayload): Promise<ApiPet> {
	return apiClient<ApiPet>("/v1/pets", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function uploadPetPhoto(petId: number, file: File): Promise<ApiFoto> {
	const formData = new FormData();
	formData.append("foto", file);

	return apiClient<ApiFoto>(`/v1/pets/${petId}/fotos`, {
		method: "POST",
		body: formData,
	});
}
