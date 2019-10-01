/* eslint-disable no-unused-expressions */
import '../css/PeopleList.css';
import '../css/cardAnim.css';

import React, { useState } from 'react';
import yoda from '../assets/img/soldier.png';
import { Card, Button, Modal, Icon, Tag, Collapse } from 'antd';

const { Panel } = Collapse;



const CardElement = (props) => {

    //State Management
    const [modal, setModal] = useState(false);
    const [details, setDetails] = useState(null);

    return(
        <div>
            <Card className="app-card our-team" style={{ width: 300 }}>
            <div className="picture">
                <img className="img-fluid" src={yoda}/>
            </div>
                <h2>{props.data.name}</h2>
                <Tag color="blue">{props.data.species == null ? 'undefined': props.data.species.name}</Tag>

                <div className="row">
                    <div className="column">
                        <p className="category">Gender:</p>
                        {props.data.gender === "male" ?
                            <Icon type="man" className="category2"/>:
                            (
                                props.data.gender === "female" ?  
                                <Icon type="woman" className="category2"/>:<p className="category2">{props.data.gender}</p>
                            )
                        }
                    </div>
                    <div className="column">
                        <p className="category">Birth Year: </p>
                        <p className="category2">{props.data.birthYear}</p>                        
                    </div>
                </div>
                <Button onClick={() => {setModal(true); setDetails(props.data.filmConnection.films);}} className="alignMore" color="#1369ce" icon="fullscreen" size={'large'}>
                    Movies
                </Button>
            </Card>

            {/* DETAILS MODAL */}
            <Modal
                title={props.data.name}
                centered
                visible={modal}
                onOk={() => setModal(false)}
                onCancel={() => setModal(false)}
                footer={[
                    <Button key="submit" type="primary" icon={"shrink"} onClick={() => setModal(false)}>
                      Ok
                    </Button>,
                  ]}
                >
                <h2>Movies List</h2>
                <Collapse bordered={false} accordion defaultActiveKey={[0]}>
                { details !== null &&
                    details.map((item, index) => {
                        return (
                            <Panel header={item.title} key={index}>
                                <p>{item.openingCrawl}</p>
                                <div className="row2">
                                    <p className="category3" style={{marginRight: 2}}>Director: </p>
                                    <p className="category2" style={{marginRight: 2}}>{item.director}</p>
                                </div>
                                <div className="row2">
                                    <p className="category3" style={{marginRight: 2}}>Producers: </p>
                                    { item.producers.map((itemProd, indexProd) => {
                                            return (
                                                <p className="category2" key={indexProd}>{ indexProd > 0 ? `,${itemProd}` : `${itemProd}` }</p>
                                            )
                                        }
                                    )}                                    
                                </div>
                                <div style={{flex: 1, flexWrap: "wrap", flexDirection: "row"}}>
                                    <p className="category3" style={{marginBottom: -2}}>Planets: </p>
                                    { item.planetConnection.planets.map((itemPlanet, indexPlanet) => {
                                            return (
                                                <Tag key={indexPlanet} color="#108ee9" style={{marginLeft: 2, marginTop: 2}}>{itemPlanet.name}</Tag>
                                            )
                                        }
                                    )}
                                </div>
                            </Panel>
                        );
                    })
                }
                </Collapse>
            </Modal>
        </div>
    )
     
}

export default CardElement;