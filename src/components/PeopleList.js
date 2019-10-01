/* eslint-disable no-unused-expressions */
import '../css/PeopleList.css';

import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Columns from 'react-columns';
import { Pagination, Card, Skeleton, Avatar, Icon, img } from 'antd';
import CardElement from './CardElement';

import mainQuery from '../queries/mainQuery'

import soldier from '../assets/img/soldier.png';

const { Meta } = Card;

//To responsive list
var queries = [{
    columns: 2,
    query: 'min-width: 700px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }, {
    columns: 5,
    query: 'min-width: 1500px'
  }];

function PeopleList() {
    //Making Request
    let { loading, error, data } = useQuery(mainQuery);

    //State Management
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);


    const handleChange = value => {
        setMin((value - 1) * 10);
        setMax(value * 10);
        //console.log('value', value)
    };

    

    //State of Request
    if (loading) {
        let load = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        console.log(load)
        return (
                <div>
                    <div className="app-container">            
                        <Columns queries={queries} >
                        {
                        load.map((item, index) => {
                            return(
                                <Card
                                style={{ width: 300, marginTop: 16, marginRight: 20 }}
                                >
                                    <Skeleton loading={true} avatar active>
                                    </Skeleton>
                                </Card>
                            )
                        })
                        }
                        </Columns>
                        
                    </div>            
                </div>                 
        )
    }
    else if (error) {return <p>Error</p>;}
    else {
        let listNames = data.allPeople.people;
        
        return (
            <div>
                <div className="app-container">            
                    <Columns queries={queries} >
                    {
                    listNames.slice(min, max).map((people, index) => {
                        return(
                            <CardElement key={index} data={people}/>
                        )
                    })
                    }
                    </Columns>
                    
                </div>
            <Pagination className="app-paginator" showQuickJumper defaultCurrent={1} onChange={handleChange} total={listNames.length} />             
            </div>
            
        )
    }   
}

export default PeopleList;