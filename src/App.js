import React, {useState, useCallback} from 'react';
import axios from 'axios';
import NewsList from './components/NewsList';
import Categories from './components/Categories';
import NewsItem from './components/NewsItem';

// const App=()=>{
//   const [data, setData]=useState(null);
//   const onClick=async()=>{
//     try{
//       const response=await axios.get('http://newsapi.org/v2/top-headlines?country=kr&apiKey=9445ab69b9464c1fac88aa0f3a7cafd5');
//       // console.log(response);
//       setData(response.data);
//       console.log(data);
//     }catch(e){
//       console.log(e);
//     }
//   };
//   return(
//     <div>
//       <div>
//         <button onClick={onClick}>불러오기</button>
//       </div>
//       {data&&<textarea rows={7} value={JSON.stringify(data, null, 2)} />}
//     </div>
//   );
// };

const App=()=>{
  const [category, setCategory]=useState('all');
  // useCallback(두 번쨰 파라미터가 비어 있는 경우): 컴포넌트가 렌더링될 떄 만들었던 함수를 계속해서 재사용하게 됨
  const onSelect=useCallback(category=>setCategory(category), []);
  return(
    <>
      <Categories category={category} onSelect={onSelect}/>
      <NewsList category={category}/>
    </>
  );
}

export default App;