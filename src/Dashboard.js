import React from 'react';
import { BoardsPage } from './BoardsPage'

export class Dashboard extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            preLoader: false,
            url: '',
            error: '', 
        }
    }

    onChange = (event) => {
        this.setState({error: ''});
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    onClick = () => {
        this.setState({preLoader: true});
        const { url } = this.state;
        fetch(`https://htmlweb.ru/analiz/api.php?whois&url=${url}&json`)
        .then(res => res.json())
        .then(data => {
            this.setState({preLoader: false});
            this.setState({data: data});
        });
    }

    logout = () => {
        localStorage.setItem('AUTH', '');
        window.location.assign('http://localhost:3000/dashboard/');
    }

    render() {

        const { login } = this.props;
        const { preLoader, data } = this.state;

        return (
            <div>
                <h3>Здравствуйте, {login} !</h3>
                <button onClick={this.logout}>Разлогиниться</button>
                <div>Введите url сайта, о котором хотите получить информацию. Например: https://online.sberbank.ru</div>
                <input name="url" onChange={this.onChange} value={this.state.url}/>
                <button onClick={this.onClick}>Посмотреть информацию</button>
                {(preLoader)
                ? <div>Загрузка</div>
                : <BoardsPage data={data}/>
                }
            </div>
        )
    }
  }