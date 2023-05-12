class Config:
    # General
    FLASK_ENV = 'debug'

    # MySQL
    # mysql+pymysql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE_NAME]
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:admin@localhost:3306/simple-oj-rd'
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
