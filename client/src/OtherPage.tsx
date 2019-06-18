import React from 'react';
import { Link } from 'react-router-dom';

 const OtherPage: React.SFC<{}> = () => {
  return (
    <div>
      Im some other page!
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default OtherPage;