import { Page } from '@playwright/test'

export const mockElasticHome = async (page: Page, { health }: { health?: string }) => {
  const status = health

  const mocks = {
    ping: {
      url: 'http://localhost:9200/',
      json: {
        'name': 'es-7-node-1',
        'cluster_name': 'es-7',
        'cluster_uuid': 'S3K3y-CNQaub_lLzyOv2Vg',
        'version': {
          'number': '7.17.10',
          'build_flavor': 'default',
          'build_type': 'docker',
          'build_hash': 'fecd68e3150eda0c307ab9a9d7557f5d5fd71349',
          'build_date': '2023-04-23T05:33:18.138275597Z',
          'build_snapshot': false,
          'lucene_version': '8.11.1',
          'minimum_wire_compatibility_version': '6.8.0',
          'minimum_index_compatibility_version': '6.0.0-beta1'
        },
        'tagline': 'You Know, for Search'
      },
    },
    clusterHealth: {
      url: 'http://localhost:9200/_cluster/health',
      json: {
        'cluster_name': 'es-7',
        'status': status,
        'timed_out': false,
        'number_of_nodes': 2,
        'number_of_data_nodes': 2,
        'active_primary_shards': 1,
        'active_shards': 2,
        'relocating_shards': 0,
        'initializing_shards': 0,
        'unassigned_shards': 0,
        'delayed_unassigned_shards': 0,
        'number_of_pending_tasks': 0,
        'number_of_in_flight_fetch': 0,
        'task_max_waiting_in_queue_millis': 0,
        'active_shards_percent_as_number': 100.0
      },
    },
    clusterStats: {
      url: 'http://localhost:9200/_cluster/stats',
      json: {
        'cluster_name': 'es-7',
        'cluster_uuid': 'S3K3y-CNQaub_lLzyOv2Vg',
        'status': status,
        'indices': {
          'count': 8,
          'shards': {
            'total': 16,
            'primaries': 8,
          },
          'docs': { 'count': 174, 'deleted': 42 },
          'store': { 'size_in_bytes': 86148700 }
        },
        'nodes': {
          'count': {
            'total': 2,
            'data': 2,
            'coordinating_only': 0,
            'master': 2,
            'ingest': 2
          },
        }
      }
    },
    catIndicesYellow: {
      url: 'http://localhost:9200/_cat/indices/?h=index&health=yellow',
      json: [{ 'index': 'unhealthy-index' }]
    }
  }

  for (const method in mocks) {
    const url = mocks[method].url
    const json = mocks[method].json

    await page.route(url, async route => (await route.fulfill({ json })))
  }
}