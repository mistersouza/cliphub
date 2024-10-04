// React imports
import { useState, useEffect } from 'react';
// Helpers imports
import { axiosResponse } from '../../api/axiosDefaults';

const SmallDropdownMenu = ({
  dropdownMenuRef,
  isDropdownMenuDisplayed,
  isOwner,
  id,
  handleDelete,
}) => {
  const [reasons, setReasons] = useState([]);

  const handleFlagSubmit = async (reason) => {
    try {
      await axiosResponse.post(`flag/clip/${id}/`, { reason });
      // if (status === 201) console.log('Clip flagged', reason);
    } catch (error) {
      console.error('Failed flagging clip', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosResponse.get('flag/reasons/');
        setReasons(data.reasons);
      } catch (error) {
        console.error('Error fetching reasons', error);
      }
    })();
  }, []);

  return (
    <div
      className={`z-10 ${isDropdownMenuDisplayed ? 'absolute right-0 top-9' : 'hidden'} 
        bg-white divide-y divide-gray-100 rounded shadow w-32`}
      id="dropdownDivider"
      ref={dropdownMenuRef}
      aria-label={isOwner ? 'Manage your clip' : 'Select flag reason'}
    >
      <ul
        className="py-2 text-sm text-gray-700 capitalize dark:text-gray-200"
        aria-labelledby="dropdownDividerButton"
      >
        {isOwner ? (
          <li
            className="
                flex w-full justify-between items-center px-3 py-2 
                hover:bg-gray-100 dark:hover:bg-gray-600          
            "
            onClick={handleDelete}
          >
            delete
          </li>
        ) : (
          <>
            {reasons.map((reason) => (
              <li
                className="
                  flex w-full justify-between items-center px-3 py-2 
                  hover:bg-gray-100 dark:hover:bg-gray-600          
                "
                key={reason}
                onClick={() => {
                  handleFlagSubmit(reason);
                }}
              >
                {reason}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default SmallDropdownMenu;
