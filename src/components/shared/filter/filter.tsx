import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Friend } from '../../../models/friendship/friendInterface';
import { useStore } from '../../../stores/store';
import Icon from '../icon/Icon';
import './filter.scss';


const Filter = ({ filter, placeholder }: any) => {

  const inputRef = React.useRef<HTMLInputElement>();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length > 0) {

      handleSearch();
    } else {
      filter('')
    }
  }, [query]);

  const handleSearch = () => {
    if (query.length > 0) {
      filter(query);
    }
  }


  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };





  return (
    <div className='Filter_Container'>
      <div className='Filter_Wrapper'>
        <div className='Filter_IconContainer'>
          <Icon name='filter' />
        </div>
        <div className='Filter_InputContainer'>
          <input id='filterInput' type="text" placeholder={placeholder} onChange={(e) => handleChange(e)} value={query}/>
        </div>
        {query !== '' &&
          <div className='Filter_Clear' onClick={handleClear}>
            <Icon name='cross' />
          </div>}
      </div>
    </div>
  )
}

export default observer(Filter)