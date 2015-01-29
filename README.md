# Swagger Model

[![Build Status](https://travis-ci.org/randing89/swagger-model.svg?branch=master)](https://travis-ci.org/randing89/swagger-model)
[![Coverage Status](https://coveralls.io/repos/randing89/swagger-model/badge.svg?branch=master)](https://coveralls.io/r/randing89/swagger-model?branch=master)
[![Dependency Status](https://gemnasium.com/randing89/swagger-model.svg)](https://gemnasium.com/randing89/swagger-model)

## generate(swaggerDefinition, templatePath, outPath)
Generate Javascript class files from swagger definition
- swaggerDefinition: JSON of Swagger definition
- templatePath: Path of language template
- outPath: Output path

## loadClasses()
Load JavaScript class into memory

## json2Model(object, className)
Build model instance from JSON object
- object JSON object, it can be either Swagger request or response object
- className JSON object type

## model2Json(object)
Build JSON object from model instance
- object Model object


# Test
```
npm test
```
