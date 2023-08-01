const perspectiveID = 'books'

export const bookProperties = `
	{
  		?id rdfs:label ?prefLabel__id .
        FILTER(LANG(?prefLabel__id) = 'en')
  		BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  		BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  		BIND(?id as ?uri__id)
  		BIND(?id as ?uri__dataProviderUrl)
  		BIND(?id as ?uri__prefLabel)
	}
    UNION
    {
        ?id dbo:author ?author__id .
        ?author__id rdfs:label ?author__prefLabel .
        FILTER(LANG(?author__prefLabel) = 'en')
    }
    UNION
    {
        ?id dbo:publisher ?publisher__id .
        ?publisher__id rdfs:label ?publisher__prefLabel .
        FILTER(LANG(?publisher__prefLabel) = 'en')
    }
`
