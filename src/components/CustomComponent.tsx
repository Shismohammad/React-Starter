import React from 'react';

export default function CustomComponent({ className, ...props }) {
  return <div {...props} className={className} />;
}
