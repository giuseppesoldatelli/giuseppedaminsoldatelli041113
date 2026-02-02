import { apiClient } from "./client";
import type { ApiTutorDetail } from "./types";

export async function getTutorById(id: number): Promise<ApiTutorDetail> {
	return apiClient<ApiTutorDetail>(`/v1/tutores/${id}`);
}
