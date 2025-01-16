import React from 'react';

function HeaderItem({ name, Icon }) {
  return (
    <div className="flex items-center gap-2 text-white cursor-pointer hover:text-gray-300 transition duration-300">
      <Icon className="h-6 w-6" />
      {name && <h2 className="text-sm font-semibold">{name}</h2>}
    </div>
  );
}

export default HeaderItem;
