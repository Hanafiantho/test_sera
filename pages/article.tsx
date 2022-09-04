import React, {useEffect, useState, useContext} from "react"
import Head from 'next/head'
import {Form, Row, Col, Table, Button, Pagination, notification} from "antd"
import {
    FileAddOutlined, 
    DeleteOutlined, 
    EyeOutlined,
    CheckCircleOutlined,
    SyncOutlined
} from "@ant-design/icons"
import type { ColumnsType } from 'antd/es/table';
import moment from "moment"
import {useRouter} from "next/router"
import {Context} from "../context"
import ArticleService from "../services/Article.service"
import {IListArticle} from "../models/ArticleModel"
import DashboardLayout from "../templates/DashboardLayout"
import ModalFormArticle from "../components/ModalFormArticle"
import Axios from "axios"
import {BaseURL} from "../configs/BaseURL"

const Article = () => {
    const { state }:any = useContext(Context);
    const router = useRouter();
    const columns:ColumnsType<IListArticle> = [
        {
            title: 'No',
            key: 'index',
            render: (text, record, index) => data.meta.pagination.pageSize * data.meta.pagination.page - data.meta.pagination.pageSize + index + 1,
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (createdAt) => moment(createdAt).format("DD MMMM YYYY, HH:mm"),
            sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
        },
        {
            title: 'Status',
            render: (article:IListArticle) => (
                <div>
                    {article.isPost ? 
                        <CheckCircleOutlined style={{color: "#52c41a", fontSize: 20}} /> 
                    : 
                        <SyncOutlined  
                            spin={loading === article.title}
                            style={{cursor: "pointer", color: "red"}} 
                            onClick={() => {
                                if (navigator.onLine) {
                                    setLoading(`${article.title}`)
                                    handleCreateArticle({title: article.title, content: article.content}, 0)
                                    setOfflineData(offlineData.filter((datum:any) => datum.title !== article.title))
                                } else {
                                    notification["warn"]({
                                        message: 'Ups!',
                                        description:
                                        `please make sure you are online`,
                                    });
                                }
                            }}
                        />
                    }
                </div>
            )
        },
        {
            title: 'Action',
            render: (article:IListArticle) => (
                <>
                    <Button 
                        type="primary" 
                        danger 
                        icon={<DeleteOutlined />}
                        style={{marginRight: 5}}
                        loading={loading === `delete${article.id}`}
                        onClick={() => handledeleteArticle(article.id)}
                    >
                        Delete
                    </Button>
                    <Button 
                        type="primary"
                        onClick={() => toggle(article.id)}
                        icon={<EyeOutlined />}
                    >
                        Detail
                    </Button>

                    <ModalFormArticle
                        formType="edit"
                        visible={visible === article.id}
                        toggle={() => toggle(null)}
                        data={article}
                        loading={loading === `update${article.id}`}
                        handleSubmit={handleUpdateArticle}
                    />
                </>
            )
        },
    ]
    const [visible, setVisible] = useState<number | null>(null)
    const [loading, setLoading] = useState<string>("")
    const [data, setData] = useState<any>({
        data: [],
        meta: {pagination: {
            page: 1,
            pageCount: 0,
            pageSize: 5,
            total: 0
        }}
    })
    const [offlineData, setOfflineData] = useState<any>([])
    const [params, setParams] = useState<any>({
        "pagination[page]": 1,
        "pagination[pageSize]": 5,
        // "sort[index]": "desc"
        // "filters[field][$contains]": 'offline'
    })

    const fetchArticles = async(queryparams:any) => {
        setLoading("fetch")
        const res = await ArticleService.getListArticle(queryparams)

        if (res.status === 200) {
            setData({
                ...res.data,
                data: res.data.data.map((datum:any) => {return {id: datum.id, isPost: true, ...datum.attributes}})
            })
        }
        setLoading("")
    }

    const handleCreateArticle = async(values:{title:string, content:string}, id:number) => {
        setLoading("create")
        if (navigator.onLine) {
            const res = await ArticleService.createArticle({data: values})
    
            if (res.status === 200) {
                setLoading("")
                notification["success"]({
                    message: 'Yeay!',
                    description:
                      'Create Success.',
                });
                toggle(null)
                fetchArticles(params)
            } else {
                setLoading("")
                notification["error"]({
                    message: 'Ups!',
                    description:
                    `${res.statusText}`,
                });
            }
        } else {
            setOfflineData([...offlineData, {...values, isPost: false}])
            setTimeout(() => {
                setLoading("")
                toggle(null)
            }, 500)
        }
    }

    const handleUpdateArticle = async(values:{title:string, content:string}, id:number) => {
        setLoading(`update${id}`)
        const res = await ArticleService.updateArticle(id, {data: values})

        if (res.status === 200) {
            setLoading("")
            notification["success"]({
                message: 'Yeay!',
                description:
                  'Update Success.',
            });
            fetchArticles(params)
        } else {
            setLoading("")
            notification["error"]({
                message: 'Ups!',
                description:
                `${res.statusText}`,
            });
        }
    }

    const handledeleteArticle = async(id:number) => {
        setLoading(`delete${id}`)
        const res = await ArticleService.deleteArticle(id)

        if (res.status === 200) {
            setLoading("")
            notification["success"]({
                message: 'Yeay!',
                description:
                  'Delete Success.',
            });
            fetchArticles(params)
        } else {
            setLoading("")
            notification["error"]({
                message: 'Ups!',
                description:
                `${res.statusText}`,
            });
        }
    }

    useEffect(() => {
        state.jwt !== "" && fetchArticles(params)
    }, [params])

    useEffect(() => {
        state.jwt === "" && router.push("/login")
    }, [state]);

    const toggle = (value:number|null) => {
        setVisible(value)
    }

    const handlePageChange = (page: number, pageSize: number) => {
        setParams({
            ...params,
            "pagination[pageSize]": pageSize,
            "pagination[page]": page
        })
    }

    console.log(data);

    return (
        <React.Fragment>
            <Head>
                <title>Article</title>
                <meta name="description" content="article page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DashboardLayout>
                <Row justify="end" style={{marginBottom: 20}}>
                    <Col flex="200px">
                        <Button 
                            type="primary" 
                            icon={<FileAddOutlined />} 
                            size="large" 
                            block
                            onClick={() => toggle(0)}
                        >
                            Create Article
                        </Button>

                        <ModalFormArticle 
                            formType="create"
                            visible={visible === 0}
                            toggle={() => toggle(null)}
                            loading={loading === "create"}
                            handleSubmit={handleCreateArticle}
                        />
                    </Col>
                </Row>

                <Table 
                    columns={columns} 
                    dataSource={[ ...offlineData, ...data.data]}
                    rowKey="id"
                    pagination={false}
                    loading={loading === "fetch"}
                />

                <Row style={{marginTop: 20}}>
                    <Col>
                        <Pagination 
                            showSizeChanger
                            pageSize={data.meta.pagination.pageSize}
                            current={
                                data.meta.pagination.page
                            }
                            total={data.meta.pagination.total}
                            onChange={handlePageChange}
                            pageSizeOptions={['5', '10', '20', '50', '100']}
                        />
                    </Col>
                </Row>
            </DashboardLayout>
        </React.Fragment>
    )
}

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await ArticleService.getListArticle()
//     const response = await Axios({
//         method: "GET",
//         url: `${BaseURL}/articles`,
//         headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTY2MjE4MzI5NywiZXhwIjoxNjY0Nzc1Mjk3fQ.lVkKr9YQ5hymLLdTzW55sRhwdbfgZduaqLhGyjmjktM`
//         },
//     });
//     console.log(response);
    
  
//     // Pass data to the page via props
//     return { props: {data: null} }
//   }

export default Article