import time

from flask import Flask, g, request

from database import sql



def create_app():
    app = Flask('Pitlane')
    app.config.from_object("config.Config")

    register_extensions(app)
    register_blueprints(app)

    @app.before_request
    def before_request():
        """Prepare some things before the application handles a request."""
        g.request_start_time = time.time()
        g.request_time = lambda: '%.5fs' % (time.time() - g.request_start_time)
        g.pjax = 'X-PJAX' in request.headers

    @app.route('/', methods=['GET'])
    def index():
        """Returns the applications index page."""
        return "don't panic"

    return app


def register_blueprints(app):
    pass
    # app.register_blueprint(account_view, url_prefix='/account')
    # app.register_blueprint(problem_view, url_prefix='/problem')
    # app.register_blueprint(submit_view, url_prefix='/submit')

def register_extensions(app):
    sql.init_app(app)

app = create_app()
app.run()

