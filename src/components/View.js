import React from 'react';

export default function View(props) {
    const active = props.active ?? false;

    return (active ? props.children : null);
}