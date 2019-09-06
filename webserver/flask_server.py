from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse

app = Flask(__name__)
api = Api(app)

class EmotionPredictor(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('diary', type=str)
        args = parser.parse_args()

        diary = args['diary']

        if 'bad' in diary or '부정' in diary:
            ret = 'bad'
        else:
            ret = 'good'

        return {'tags': ret}



api.add_resource(EmotionPredictor, '/predict')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
