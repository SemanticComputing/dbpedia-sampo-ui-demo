const perspectiveID = 'writers'

export const writerProperties = `
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
        ?id dbo:genre ?genre__id .
        ?genre__id rdfs:label ?genre__prefLabel .
        FILTER(LANG(?genre__prefLabel) = 'en')
    }
    UNION
    {
        ?id dbo:occupation ?occupation__id .
        ?occupation__id rdfs:label ?occupation__prefLabel .
        FILTER(LANG(?occupation__prefLabel) = 'en')
    }
    UNION
    {
        ?id dbo:almaMater ?almaMater__id .
        ?almaMater__id rdfs:label ?almaMater__prefLabel .
        FILTER(LANG(?almaMater__prefLabel) = 'en')
    }
`

export const writersByOccupationQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?writer) as ?instanceCount)
    WHERE {
        <FILTER>
        {
            ?writer a dbo:Writer ;
                        dbo:occupation ?category .
            ?category rdfs:label ?prefLabel .
            FILTER(LANG(?prefLabel) = 'en')
        }
        UNION
        {
            ?writer a dbo:Writer .
            FILTER NOT EXISTS {
                ?writer dbo:occupation [] .
            }
            BIND("Unknown" as ?category)
            BIND("Unknown" as ?prefLabel)
        }
    }
    GROUP BY ?category ?prefLabel
    ORDER BY DESC(?instanceCount)
`

export const writersByOccupationWithoutUnknownQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?writer) as ?instanceCount)
    WHERE {
        <FILTER>
        {
            ?writer a dbo:Writer ;
                        dbo:occupation ?category .
            ?category rdfs:label ?prefLabel .
            FILTER(LANG(?prefLabel) = 'en')
        }
    }
    GROUP BY ?category ?prefLabel
    ORDER BY DESC(?instanceCount)
`

export const writersByGenreQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?writer) as ?instanceCount)
    WHERE {
        <FILTER>
        {
            ?writer a dbo:Writer ;
                        dbo:genre ?category .
            ?category rdfs:label ?prefLabel .
            FILTER(LANG(?prefLabel) = 'en')
        }
        UNION
        {
            ?writer a dbo:Writer .
            FILTER NOT EXISTS {
                ?writer dbo:genre [] .
            }
            BIND("Unknown" as ?category)
            BIND("Unknown" as ?prefLabel)
        }
    }
    GROUP BY ?category ?prefLabel
    ORDER BY DESC(?instanceCount)
`

export const writersByGenreWithoutUnknownQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?writer) as ?instanceCount)
    WHERE {
        <FILTER>
        {
            ?writer a dbo:Writer ;
                        dbo:genre ?category .
            ?category rdfs:label ?prefLabel .
            FILTER(LANG(?prefLabel) = 'en')
        }
    }
    GROUP BY ?category ?prefLabel
    ORDER BY DESC(?instanceCount)
`

export const writersByBirthCountryQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?writer) as ?instanceCount)
    WHERE {
        <FILTER>
        {
            ?writer a dbo:Writer ;
                        dbo:birthPlace/dbo:country ?category .
            ?category rdfs:label ?prefLabel .
            FILTER(LANG(?prefLabel) = 'en')
        }
        UNION
        {
            ?writer a dbo:Writer .
            FILTER NOT EXISTS {
                ?writer dbo:birthPlace/dbo:country [] .
            }
            BIND("Unknown" as ?category)
            BIND("Unknown" as ?prefLabel)
        }
    }
    GROUP BY ?category ?prefLabel
    ORDER BY DESC(?instanceCount)
`

export const writersByBirthCountryWithoutUnknownQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?writer) as ?instanceCount)
    WHERE {
        <FILTER>
        {
            ?writer a dbo:Writer ;
                dbo:birthPlace/dbo:country ?category .
            ?category rdfs:label ?prefLabel .
            FILTER(LANG(?prefLabel) = 'en')
        }
    }
    GROUP BY ?category ?prefLabel
    ORDER BY DESC(?instanceCount)
`

export const publicationsByYearQuery = `
  SELECT ?category (COUNT (DISTINCT ?book) as ?count) WHERE {
    <FILTER>
    ?book dbo:author ?author .
    ?book dbo:releaseDate ?date .
    BIND(YEAR(xsd:dateTime(?date)) as ?category)
  }
  GROUP BY ?category
  ORDER BY ?category
`