import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './DropdownList.css'


class DropdownList extends Component {
    state = {
      vibes: ['짜증난', '권태로운', '후회하는'],
      situations: ['마약 하는', '정체성을 찾는 ', '꿈 속에 빠진'],
    };

   /* handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
*/

    handleSubmit = (e) => {
      e.preventDefault();
    }

    render() {
      const { vibes,situations } = this.state;
      return (
            <div className='tag_Wrapper'>
                <form
                    className='tag_form'
                    onSubmit={this.handleSubmit}>
                    <label className='tag_vibes'>
                        <span className='tag_vibes_text'>오늘 나는</span>
                        <select className='tag_dropdown'>
                            {vibes.map((vibe) => (
                                <option
                                    key={vibe}
                                    value={vibe}>
                                    {vibe}
                                </option>
                            ))}
                        </select>
                        <span className='tag_vibes_text'>주인공이</span>
                    </label>
                    <label className='tag_situations'>
                        <select className='tag_dropdown'>
                            {situations.map((situation) => (
                                <option key={situation} value={situation}>
                                    {situation}
                                </option>
                            ))}
                        </select>
                    </label>
                    <Link
                        to='#'
                        className='tag_button'
                    >
                        <button type="submit"> 영화 볼래 </button>
                    </Link>
                   {/* <input
                        name='search'
                        placeholder='영화 제목, 아이디,'
                        onChange={this.handleChange}
                        value={search}
                    />
                    <Link to='/searchContainer'>
                    <button type="submit">등록</button>
                    </Link>*/}
                </form>
            </div>
      );
    }
}

export default DropdownList;
