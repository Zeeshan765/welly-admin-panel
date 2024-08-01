import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import ProfileForm from './doctorPanel/ProfileForm';
import AddConsultation from './doctorPanel/AddConsultation';

const UnderlineTabs = ({
  consultations,
  setConsultations,
  handleProfile,
  handleDataSubmit,
  loadSpin,
}: any) => {
  const data = [
    {
      label: 'Profile',
      value: 'profile',
      icon: UserCircleIcon,
      desc: <ProfileForm handleProfile={handleProfile} />,
    },
    {
      label: 'Consultation',
      value: 'consultation',
      icon: Square3Stack3DIcon,
      desc: (
        <AddConsultation
          consultations={consultations}
          setConsultations={setConsultations}
          handleDataSubmit={handleDataSubmit}
          loadSpin={loadSpin}
        />
      ),
    },
  ];
  return (
    <Tabs value="profile">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: 'w-5 h-5' })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default UnderlineTabs;
