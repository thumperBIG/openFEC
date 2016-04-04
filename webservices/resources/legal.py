import sqlalchemy as sa

from flask_apispec import doc, marshal_with

from webservices import args
from webservices import docs
from webservices import utils
from webservices.utils import use_kwargs
from webargs import fields
from pyelasticsearch import ElasticSearch
from webservices.env import env


es_conn = env.get_credential('ES_CONN', 'http://localhost:9200')
es = ElasticSearch(es_conn)
print("new ES connection...")

class Search(utils.Resource):
    @use_kwargs(args.query)
    def get(self, **kwargs):
        query = kwargs['q']
        hits = es.search('_all: %s' % query, index='docs', size=10)['hits']['hits']
        return {'results': hits}