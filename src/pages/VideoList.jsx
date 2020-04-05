import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import api from '../api';

import styled from 'styled-components';

import '../assets/styles/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

// const Update = styled.div`
//     color: #ef9b0f;
//     cursor: pointer;
// `

// const Delete = styled.div`
//     color: #ff0000;
//     cursor: pointer;
// `

class UpdateVideo extends Component {
    // updateEntry = event => {
    //     event.preventDefault();

    //     window.location.href = `/admin/videos/update/${this.props.id}`;        
    // }

    render() {
        return <Link to={`/admin/videos/update/${this.props.id}`} > Update </Link>
    }
}

class DeleteVideo extends Component {
    deleteEntry = async () => {
        if (
            window.confirm(
                `Do you want to delete the video ${this.props.id} permanently?`,
            )
        ) {
            // // await api.deleteVideoById(this.props.id).then( () => {
            // //     window.location.reload(true);
            // //     //history.replace('/')
            // // });
            
            new Promise((resolve, reject) => {
                api.deleteVideoById(this.props.id).then( () => {
                    resolve();
                });    
            }).catch(() => {
        
            }).finally(() => {
                window.location.reload(true);        
            });
    
        }        
    }


    render() {
        return <Link to={`/admin/videos/list`} onClick={this.deleteEntry} > Delete </Link>
    }
}

class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });
        
        await api.getAllVideos().then(videos => {
            this.setState({
                videos: videos.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { videos, isLoading } = this.state;

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'TITLE',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'URL',
                accessor: 'url',
                filterable: true,
            },
            {
                Header: 'CATEGORY',
                accessor: 'category',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteVideo id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateVideo id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true;
        if (!videos.length) {
            showTable = false;
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={videos}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={20}
                        showPageSizeOptions={true}
                        minRows={0}
                        style={{
                            // This will force the table body to overflow and scroll, since there is not enough room
                            height: "400px"
                        }}
                    />
                )}
            </Wrapper>
        )
    }
}

export default VideoList;
