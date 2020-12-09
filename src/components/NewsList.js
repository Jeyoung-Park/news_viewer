import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock=styled.div`
    box-sizing:border-box;
    padding-bottom:3rem;
    width:768px;
    margin: 0 auto;
    margin-top:2rem;
    /* @media: 미디어 특정하기 */
    @media screen and (max-width:768px){
        width:100%;
        padding-left:1rem;
        padding-right:1rem;
    }
`;

const sampleArticle={
    title:'제목',
    description: '내용',
    url:'https://google.com',
    urlToImage:'https://via.placeholder.com/160'
};

const NewsList=({category})=>{
    const [articles, SetArticles]=useState(null);
    const [loading,  setLoading]=useState(false);

//두 번째 파라미터로 비어 있는 배열을 넣어주었음 -> 설정된 함수가 맨 처음 렌더링될 때만 실행하고, 업데이트할 때는 실행 x(마운트될 떄 호출)
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);
            try{
                const query=category==='all'?'':`&category=${category}`;
                const response=await axios.get(`http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=9445ab69b9464c1fac88aa0f3a7cafd5`);
                console.log(response);
                SetArticles(response.data.articles);
                console.log(articles);
            }catch(e){
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);
// 대기중일떄
    if(loading){
        console.log('대기중');
        return <NewsListBlock>대기중...</NewsListBlock>
    }
// 아직 articles 값이 설정되지 않았을 떄
    if(!articles){
        console.log("기사 값 설정 x");
        return null;
    }
//아직 articles 값이 유효할 떄
    return(
        <NewsListBlock>
            {articles.map(article=>(
                <NewsItem key={article.url} article={article}></NewsItem>
            ))}
        </NewsListBlock>
    );
}

export default NewsList;