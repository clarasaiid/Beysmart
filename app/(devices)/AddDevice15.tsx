import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { LOCK_CALIBRATION_STEPS } from '../../design-system/home/Constants';
import CalibrationStepScreen from './CalibrationStepScreen';

const AddDevice15 = () => {
  const params = useLocalSearchParams();
  const currentStep = 6;
  const totalSteps = LOCK_CALIBRATION_STEPS.STEPS.length;
  const stepData = LOCK_CALIBRATION_STEPS.STEPS[currentStep - 1];

  const handleNext = () => {
    // Last step - navigate to calibration success screen
    console.log('Calibration completed!');
    router.push({
      pathname: '/(devices)/AddDevice16' as any,
      params: {
        deviceName: params.deviceName,
        deviceLocation: params.deviceLocation,
        deviceType: params.deviceType,
      }
    });
  };

  return (
    <CalibrationStepScreen
      currentStep={currentStep}
      totalSteps={totalSteps}
      title={stepData.title}
      description={stepData.description}
      onNext={handleNext}
      showBackButton={true}
    />
  );
};

export default AddDevice15;
