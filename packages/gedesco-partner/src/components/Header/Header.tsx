import React from 'react';

type HeaderProps = {
    title?: string;
};

const Header = (props: HeaderProps) => {
    const { title } = props;
    return (
        <div className='app-header'>
            {title}
        </div>
    )
}

export default Header;