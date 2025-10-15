import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { LOCK_CALIBRATION_STEPS } from '../../design-system/home/Constants';
import CalibrationStepScreen from './CalibrationStepScreen';

const AddDevice13 = () => {
  const params = useLocalSearchParams();
  const currentStep = 4;
  const totalSteps = LOCK_CALIBRATION_STEPS.STEPS.length;
  const stepData = LOCK_CALIBRATION_STEPS.STEPS[currentStep - 1];

  const handleNext = () => {
    // Navigate to next step (AddDevice14)
    router.push({
      pathname: '/(devices)/AddDevice14' as any,
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

export default AddDevice13;
