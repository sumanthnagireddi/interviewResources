import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  topics_endpoint: any = environment.API_URL + '/topics';
  constructor(private http: HttpClient) {}

  getTopics() {
    return this.http.get(this.topics_endpoint);
  }
  getAllTopicsByTechID(id: string) {
    return this.http.get(this.topics_endpoint + '/' + 'all' + '/' + id);
  }
  addTopic(topic_payload: any) {
    const payload = {
      slug: topic_payload?.title
        ?.trim() // remove leading/trailing spaces
        .toLowerCase() // convert to lowercase
        .replace(/\s+/g, '-') // replace spaces (one or more) with hyphens
        .replace(/[^a-z0-9-]/g, ''), // optional: remove special characters
      technologyId: topic_payload?.technologyId?.id,
      name: topic_payload?.title,
      topic_description: topic_payload?.topic_description,
    };
    return this.http.post(this.topics_endpoint, payload);
  }

  updateTopic(topic_payload: any) {
    const payload = {
      ...topic_payload,
      slug: topic_payload?.name
        ?.trim() // remove leading/trailing spaces
        .toLowerCase() // convert to lowercase
        .replace(/\s+/g, '-') // replace spaces (one or more) with hyphens
        .replace(/[^a-z0-9-]/g, ''), // optional: remove special characters
    };

    return this.http.patch(
      this.topics_endpoint + '/' + topic_payload.topicId,
      payload
    );
  }

  deleteTopic(topicId: string) {
    return this.http.delete(this.topics_endpoint + '/' + topicId);
  }
}
