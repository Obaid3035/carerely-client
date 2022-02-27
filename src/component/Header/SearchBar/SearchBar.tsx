import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import * as BiIcon from 'react-icons/bi';
import Data from './MOCK_DATA.json';
import Avatar from '../../../assets/img/avatar.png';
import './SearchBar.scss';
import Button from '../../Button/Button';

const SearchBar = () => {
   const [query, setQuery] = React.useState('');
   const [hideSearchBar, setHideSearchBar] = React.useState('search_results hide_search_results');
   const onSearchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setHideSearchBar('search_results');
   };
   const ref = React.useRef(null);


   useEffect(() => {
      function handleClickOutside(event: any) {
         // @ts-ignore
         if (ref.current && !ref.current.contains(event.target)) {
            setHideSearchBar('search_results hide_search_results');
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [ref]);
   const filteredData = () => {
      const filteredData = Data.filter((users) => {
         if (query === '') {
            return false;
         } else if (users.first_name.toLowerCase().includes(query.toLowerCase())) {
            return true;
         }
      });

      if (filteredData.length === 0) {
         return <p className={'text-center my-0'}>No Result Found</p>;
      } else {
         return filteredData.splice(0, 5).map((filteredUsers) => (
            <div className={'search_users'} key={filteredUsers.id}>
               <img width={60} alt={'avatar'} src={Avatar} />
               <p>{filteredUsers.first_name} {filteredUsers.last_name}</p>
            </div>
         ));
      }
   };
   return (
      <div ref={ref} className={'search'}>
         <Form className={'search_form'}>
            <Form.Control
               type='text'
               placeholder={'Search For Contact'}
               onChange={onSearchChangeHandler}
            />
            <Button>
               <BiIcon.BiSearchAlt2 />
            </Button>
         </Form>
         <div className={hideSearchBar + ' animate__animated animate__zoomIn'}>
            {filteredData()}
         </div>
      </div>
   );
};

export default SearchBar;
