import {APIResponse} from '@/interfaces/axios-response';
import {IPostsAPI} from '@/interfaces/posts-interfaces';
import {api} from '@/services/api';

export const listPostsAPI = (data: {
    per_page: number;
    offset_id: number;
}): APIResponse<IPostsAPI> => api.get('/api/v1/posts', {params: {per_page: 1000}});
