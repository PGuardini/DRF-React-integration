const Title = ({ children }) => {
    return <h1>{children}</h1>;
}

function Article() {
    return (
        <main>
            <Title>Hello, React!</Title>
        </main>);
}

export default Article;