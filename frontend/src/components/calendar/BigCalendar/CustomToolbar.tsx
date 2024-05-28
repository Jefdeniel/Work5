import { ToolbarProps } from 'react-big-calendar';
import Button from '../../ui/Button/Button';

export interface ICustomToolbarProps {
  toolbar: ToolbarProps;
}

const CustomToolbar = ({ toolbar }: ICustomToolbarProps) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('NEXT');
  };

  return (
    <div className="rbc-toolbar">
      <Button
        className="btn btn--bordered-primary"
        onClick={goToBack}
        style={{ marginRight: '5px' }}
        text="Previous"
      />
      <Button
        className="btn btn--bordered-primary"
        onClick={goToNext}
        style={{ marginRight: '5px' }}
        text="Next"
      />
    </div>
  );
};

export default CustomToolbar;

// import React from 'react';
// import { ToolbarProps, Views } from 'react-big-calendar';
// import { LeftIcon, RightIcon } from '../../ui/Icon/SvgIcons';
// import './CustomToolbar.scss';
// import Button from '../../ui/Button/Button';

// interface CustomToolbarProps extends ToolbarProps {
//   onShowView: (view: Views) => void; // Function to switch calendar view
//   weekendVisibility: boolean; // Indicates whether weekends are visible
// }

// const CustomToolbar: React.FC<CustomToolbarProps> = ({
//   date,
//   onNavigate,
//   onView,
//   onShowView,
//   weekendVisibility,
// }) => {
//   const goToDayView = () => {
//     onShowView(Views.DAY);
//   };

//   const goToWeekView = () => {
//     onShowView(weekendVisibility ? Views.WEEK : Views.WORK_WEEK);
//   };

//   const goToMonthView = () => {
//     onShowView(Views.MONTH);
//   };

//   const goToBack = () => {
//     const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
//     onNavigate('prev', newDate);
//   };

//   const goToNext = () => {
//     const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
//     onNavigate('next', newDate);
//   };

//   return (
//     <div className="toolbar-container">
//       <div className="navigation-buttons">
//         <button className="btn btn-back" onClick={goToBack}>
//           <LeftIcon className="prev-icon" />
//         </button>
//         <button className="btn btn-next" onClick={goToNext}>
//           <RightIcon className="next-icon" />
//         </button>
//         <label className="label-date">{date.toLocaleDateString()}</label>
//       </div>
//       <div className="filter-container">
//         <Button
//           className={`btn btn--bordered-primary ${
//             onView === Views.DAY ? 'active' : ''
//           }`}
//           onClick={goToDayView}
//         >
//           <span className="label-filter-off">Day</span>
//         </Button>
//         {weekendVisibility && (
//           <Button
//             className={`btn btn--bordered-primary ${
//               onView === Views.WEEK ? 'active' : ''
//             }`}
//             onClick={goToWeekView}
//           >
//             <span className="label-filter-off">Week</span>
//           </Button>
//         )}
//         <Button
//           className={`btn btn--bordered-primary ${
//             onView === Views.MONTH ? 'active' : ''
//           }`}
//           onClick={goToMonthView}
//         >
//           <span className="label-filter-off">Month</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CustomToolbar;
