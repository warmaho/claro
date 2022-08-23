import { Descriptions, Drawer, Table, Card, Typography ,Button, Space, Spin, Image } from 'antd';
const { Title } = Typography;
import { useDispatch } from 'react-redux'
import React, { useState } from 'react';
import { CloseOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import moment from "moment";
import {useSelector} from "react-redux";
import {getChannels, setHover} from "../actions";
const ModalEPG = (params) => {
    const [dataTable, setDataTable] = useState([]);
    const state = useSelector((state) => state.channels)
    const dispatch = useDispatch()
    const spaceTime = 500;
    React.useEffect(() =>{
        if(params.visible){
            dispatch(getChannels(moment().format("YYYYMMDD")))
        }

    },[params.visible])
    React.useEffect(() =>{
        if(state.channels){
            setDataTable(state.channels)
        }

    },[state.channels])
    React.useEffect(() =>{
        console.log("state.hover")
        console.log(state.hover)
    },[state.hover])

    const hoverable = (e) => {
        setTimeout(()=>{
            dispatch(setHover(e))
        },0)

    }
    const scrollLeft = () => {
        const tableBody = document.getElementsByClassName("ant-table-body")[0];
        tableBody.scrollLeft= tableBody.scrollLeft-spaceTime
    }
    const scrollRight = () => {
        const tableBody = document.getElementsByClassName("ant-table-body")[0];
        tableBody.scrollLeft= tableBody.scrollLeft+spaceTime
    }


    const handleCancel = () => {
        params.update(false)
    };
    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push({
            key: i,
            hour: (i<10?"0"+i: i) +":00",
        });
    }
    const columns = [
        {
            title: 'Hoy',
            width: 250,
            key: 'name',
            fixed: 'left',
            render: (e) => <Space>
                <Title style={{width:150}} level={5} >
                    {e.name}
                </Title>
                <Image
                    width={80}
                    src={e.image}
                />
            </Space>,
        }
    ];
    hours.forEach((e,i)=>{
        (i===0) ?
            columns.push({
                title: e.hour,
                width: spaceTime,
                align: 'left',
                render: (e) => <Space>{makeSpaces(e.events)}</Space>,
                onCell: (_, index) => ({
                    colSpan: columns.length+1,
                }),
            })
            :
            columns.push({
                title: e.hour,
                dataIndex: 'address',
                width: spaceTime,
                align: 'left',
                render: () => <span />,
            })
    })
    columns.push( {
        title: <Space>
            <Button icon={<CaretLeftOutlined />} size="small" onClick={scrollLeft}/>
            <Button icon={<CaretRightOutlined />} size="small" onClick={scrollRight} />
        </Space>,
        width: 50,
        align: 'right',
        fixed: 'right',
        render: () => <span style={{ background:"transparent"}}/>
    },)
    const makeSpaces = (events) => {
        return events.map((e,i)=>{
                let minutes
            if(i===0){
                let start = moment(moment().format("YYYYMMDD")).add(1, 'hour').unix()
                minutes = (e.unix_end-start)/60
            }else{
                if(i===events.length-1){
                    let end = moment(moment().add(1, 'day').format("YYYYMMDD")).add(1, 'hour').unix()
                    minutes = (end-e.unix_begin)/60
                }else {
                    minutes = (e.unix_end-e.unix_begin)/60
                }
            }

            let width= (spaceTime*minutes)/60

            return (
                    <Card className={"active"} key={e.id} style={{ width: width, maxHeight:"135px", overflow:"hidden"}}
                          onMouseEnter={()=>{hoverable(e)}}>
                        <Descriptions title={e.name}>
                            <Descriptions.Item label="">{e.date_begin.slice(10,16)} - {e.date_end.slice(10,16)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
            )


        })
    }
    return (
            <Drawer
                placement="right"
                onClose={handleCancel}
                closeIcon={<CloseOutlined  style={{ fontSize: '16px', color: '#ffffff' }}/>}
                visible={params.visible}
                width={'100%'}
                maskStyle={{background:"black"}}
                bodyStyle={{background:"#000000db", color:"white"}}
                headerStyle={{color:"white", position:"absolute", right:"0", borderBottom:0}}

            >

                <Spin spinning={state.pending} tip="Loading...">

                <Card className="card my-4" >
                    {state.hover &&
                    <Descriptions  column={{ xxl: 8}} title={<Title className="text-white">{state.hover.name}</Title>}>
                        <Descriptions.Item>
                            <Title level={5} className="text-white">
                                {moment(state.hover.date_begin).format("hh:mm")}hrs a {moment(state.hover.date_end).format("hh:mm")}hrs
                            </Title>
                        </Descriptions.Item>
                        <Descriptions.Item>
                            <Title level={5} className="text-white">
                                {state.hover.duration}
                            </Title>
                        </Descriptions.Item>
                        <Descriptions.Item>
                            <Title level={5} className="text-white">
                                {state.hover.language}
                            </Title>
                        </Descriptions.Item>
                    </Descriptions>

                    }
                    <Title level={3} className="text-white">  {state.hover && state.hover.description}</Title>
                </Card>
                <Table
                    columns={columns}
                    dataSource={dataTable}
                    pagination={false}
                    scroll={{
                        x: 'calc(700px + 50%)',
                        y: 'calc(50vh)',
                    }}
                />
                </Spin>
            </Drawer>
    );
};

export default ModalEPG;