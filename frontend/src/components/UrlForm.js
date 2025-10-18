import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { shortenUrl } from "../modules/api/UrlApi";
export default function UrlForm() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setShortUrl("");
        try {
            if (!url.startsWith("http")) {
                setError("Please enter a valid URL starting with http or https");
                return;
            }
            const res = await shortenUrl(url);
            setShortUrl(`${window.location.origin}/${res.slug}`);
        }
        catch (err) {
            setError(err.response?.data?.message || "Error shortening URL");
        }
    };
    return (_jsxs("div", { style: { marginTop: "2rem" }, children: [_jsxs("form", { onSubmit: handleSubmit, style: { display: "flex", gap: "1rem" }, children: [_jsx("input", { className: "input", placeholder: "Enter a long URL", value: url, onChange: (e) => setUrl(e.target.value) }), _jsx("button", { className: "button", type: "submit", children: "Shorten" })] }), error && _jsx("p", { style: { color: "red" }, children: error }), shortUrl && (_jsxs("p", { children: ["Short URL:", " ", _jsx("a", { href: shortUrl, target: "_blank", rel: "noreferrer", children: shortUrl })] }))] }));
}
