import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AliasToVenderRoute = () => {
    const { alias } = useParams();  // URL에서 alias 값 가져옴
    const [venderId, setVenderId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (alias) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/api/vender/getIdByAlias/${alias}`)
                .then((response) => {
                    const venderId = response.data.venderId;  // API 응답에서 venderId 가져오기
                    if (venderId) {
                        setVenderId(venderId);
                    } else {
                        console.error('Invalid alias:', alias);
                        navigate('/404');  // 존재하지 않는 alias일 경우 404로 이동
                    }
                })
                .catch((error) => {
                    console.error("Error fetching venderId by alias:", error);
                    navigate('/404');  // API 에러 시 404로 이동
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [alias, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!venderId) {
        return <Navigate to="/404" replace />;
    }

    return <Navigate to={`/user/storedetail/${venderId}`} replace />;
};

export default AliasToVenderRoute;
