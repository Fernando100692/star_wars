import { gql } from 'apollo-boost';

const getActorsQuery = gql`
    {
        allPeople{
            people{
                name
                birthYear
                gender
                species{
                name
                }
                filmConnection{
                    films{
                        title
                        openingCrawl
                    
                        planetConnection{
                            planets{
                                name
                                diameter
                            }
                        }
                        director
                        producers
                        
                    }
                }
            }
        }
    }
`;

export default getActorsQuery;