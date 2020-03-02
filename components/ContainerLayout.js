import Header from './Header';

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
};

const ContainerLayout = (props) => (
    <div className="container">
        <Header />
        {props.children}

          <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.8;
          color: #333;
          font-family: sans-serif;
            display: initial;
        }
        h1 {
          font-weight: 700;
        }
        p {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
);

export default ContainerLayout;
