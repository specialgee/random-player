import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../helpers';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Select = styled.select.attrs({
    className: 'form-control',
})`
  ${'' /* width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  } */}
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

// const CancelButton = styled.a.attrs({
//     className: `btn btn-danger`,
// })`
//     margin: 15px 15px 15px 5px;
// `

class VideoUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.match.params.id,
            title: '',
            url: '',
            category: '',
        }
    }
    

    handleChangeInputTitle = async event => {
        const title = event.target.value;
        this.setState({ title });
    }

    handleChangeInputUrl = async event => {
        const url = event.target.value;
        this.setState({ url });
    }
    
    handleChangeInputCategory = async event => {
        const category = event.target.value;
        this.setState({ category });
    }

    handleUpdateVideo = async () => {
        const { _id, title, url, category } = this.state;
        const payload = { title, url, category }

        new Promise((resolve, reject) => {
            api.updateVideoById(_id, payload)
            .then(res => {
                window.alert(`Video updated successfully`);
                resolve();
            })
        }).catch(() => {

        }).finally(() => {
            history.push(process.env.PUBLIC_URL + "/admin/videos/list");
            window.location.reload(true);
        })    
    }

    componentDidMount = async () => {
        const { _id } = this.state;
        const video = await api.getVideoById(_id)

        this.setState({
            title: video.data.data.title,
            url: video.data.data.url,
            category: video.data.data.category,
        })
    }

    render() {
        const { title, url, category } = this.state;
        return (
            <Wrapper>
                <Title>ADD VIDEO</Title>

                <Label>TITLE: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>URL: </Label>
                <InputText
                    type="text"
                    value={url}
                    onChange={this.handleChangeInputUrl}
                />

                <Label>CATEGORY: </Label>
                <Select
                    type="text"
                    value={category}
                    onChange={this.handleChangeInputCategory}
                >
                    <option value="" hidden></option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="RAP">RAP FR</option>
                    <option value="SKATE">SKATEBOARD</option>
                </Select>

                <Button onClick={this.handleUpdateVideo}>UPDATE VIDEO</Button>
                {/* <CancelButton href={'/admin/videos/list'}>CANCEL</CancelButton> */}
                <Link to="/admin/videos/list" className="btn btn-danger"> CANCEL </Link>
            </Wrapper>
        )
    }
}

export default VideoUpdate;
