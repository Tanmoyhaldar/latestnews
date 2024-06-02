import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL, API_KEY, formatDate, itemsPerPage } from '../utilities/constants';
import Search from './Search'
import Header from './Header'
import NewsCard from './NewsCard'
import NoNews from './NoNews';
import Loader from '../utilities/Loader';
import '../styles/MainPage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainPage() {
    let url = ``;
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date())
    const [newsList, setNewsList] = useState([]);
    const [displayedNews, setDisplayedNews] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log("URL Params---", searchQuery, "--", formatDate(fromDate), "--", formatDate(toDate));
    }, [searchQuery, fromDate, toDate])


    const getAllNews = () => {
        setLoading(true)
        url = `${API_URL}?apiKey=${API_KEY}&sortBy=popularity&q=${searchQuery}&from=${formatDate(fromDate)}&to=${formatDate(toDate)}`
        console.log("url---", url)
        setDisplayedNews(newsList.slice(0, itemsPerPage));
        axios.get(url)
            .then(response => {
                console.log("response--->", response)
                if (response?.data?.status.trim() == "ok") {
                    setLoading(false)
                    // console.log("response--->", response.data.articles)
                    setNewsList(response.data.articles);
                    setDisplayedNews(response.data.articles.slice(0, itemsPerPage));
                    setPage(1);
                }
            })
            .catch(error => {
                toast.error("Enter something in the search Field.")
                console.error("Error fetching news:", error);
            });
    }
    const loadMoreNews = () => {
        const newPage = page + 1;
        const newDisplayedNews = newsList.slice(0, newPage * itemsPerPage);
        setDisplayedNews(newDisplayedNews);
        setPage(newPage);
    };

    const handleReload = () => {
        window.location.reload()
    }

    return (
        <>
        <ToastContainer />
            <div className="main-container">
            <Header />
            <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
            />
            <div className="button-container">
                <button
                    onClick={getAllNews}
                    className="btn btn-primary"
                    disabled={searchQuery.length === 0} // Disable button when searchQuery is empty
                >
                    Search
                </button>
                <button onClick={handleReload} className="btn btn-danger">
                    Refresh
                </button>
            </div>
            {loading && <Loader />}
            <div className="news-container">
                {displayedNews.length > 0 ? (
                    <>
                        {displayedNews.map((news, index) => (
                            <NewsCard key={index} news={news} />
                        ))}
                        {displayedNews.length < newsList.length && (
                            <button onClick={loadMoreNews} className="load-more">
                                Load More
                            </button>
                        )}
                    </>
                ) : (
                    <NoNews />
                )}
            </div>
        </div>

        </>

    )
}
