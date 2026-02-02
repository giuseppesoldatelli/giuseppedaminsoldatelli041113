import { apiClient } from "./client";
import type { ApiPet, PaginatedResponse, PetsListParams, UpdatePetPayload } from "./types";

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
