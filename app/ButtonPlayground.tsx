// screens/ButtonPlayground.tsx
import { ScrollView } from 'react-native';
import { AppButton } from '../design-system/Buttons/Buttons';
import { colors } from '../design-system/colors/colors';
import * as Icons from '../design-system/icons';
import { Spacing } from '../design-system/Layout/spacing';
import { Typography } from '../design-system/typography/typography';

export default function ButtonPlayground() {
  return (
    <ScrollView 
      contentContainerStyle={{ 
        padding: Spacing.sm, 
        gap: Spacing.sm, 
        backgroundColor: colors.surface 
      }}
    >
      {/* PRIMARY BUTTONS */}
      <Typography variant="h3" color={colors.text} style={{ marginVertical: Spacing.xs }}>
        Primary Buttons
      </Typography>
      <AppButton variant="primaryLarge" title="Start" onPress={() => {}} />
      <AppButton variant="primaryMedium" title="Start" onPress={() => {}} />
      <AppButton variant="primarySmall" title="Start" onPress={() => {}} />
      <AppButton variant="primaryPressed" title="Start" onPress={() => {}} />
      <AppButton variant="primaryDisabled" title="Start" disabled onPress={() => {}} />

      {/* SECONDARY BUTTONS */}
      <Typography variant="h3" color={colors.text} style={{ marginVertical: Spacing.xs }}>
        Secondary Buttons
      </Typography>
      <AppButton variant="secondaryLarge" title="Start" onPress={() => {}} />
      <AppButton variant="secondaryMedium" title="Start" onPress={() => {}} />
      <AppButton variant="secondarySmall" title="Start" onPress={() => {}} />
      <AppButton variant="secondaryPressed" title="Start" onPress={() => {}} />
      <AppButton variant="secondaryDisabled" title="Start" disabled onPress={() => {}} />

      {/* TEXT ONLY */}
      <Typography variant="h3" color={colors.text} style={{ marginVertical: Spacing.xs }}>
        Text Only
      </Typography>
      <AppButton variant="textOnlyLarge" title="Start" onPress={() => {}} />
      <AppButton variant="textOnlyMedium" title="Start" onPress={() => {}} />
      <AppButton variant="textOnlySmall" title="Start" onPress={() => {}} />
      <AppButton variant="textOnlyPressed" title="Start" onPress={() => {}} />
      <AppButton variant="textOnlyDisabled" title="Start" disabled onPress={() => {}} />

      {/* ICON ONLY */}
      <Typography variant="h3" color={colors.text} style={{ marginVertical: Spacing.xs }}>
        Icon Only
      </Typography>
      <AppButton variant="iconOnlyLarge" icon={<Icons.TimeIcon width={20} height={20} />} onPress={() => {}} />
      <AppButton variant="iconOnlyMedium" icon={<Icons.TimeIcon width={20} height={20} />} onPress={() => {}} />
      <AppButton variant="iconOnlySmall" icon={<Icons.TimeIcon width={20} height={20} />} onPress={() => {}} />
      <AppButton variant="iconOnlyPressed" icon={<Icons.TimeIcon width={20} height={20} />} onPress={() => {}} />
      <AppButton variant="iconOnlyDisabled" icon={<Icons.TimeIcon width={20} height={20} />} disabled onPress={() => {}} />

      {/* ICON ONLY WITH DIFFERENT ICONS */}
      <Typography variant="h3" color={colors.text} style={{ marginVertical: Spacing.xs }}>
        Icon Only - Different Icons
      </Typography>
      <AppButton variant="iconOnlyMedium" icon={<Icons.FilledLightIcon width={20} height={20} />} onPress={() => {}} />
      <AppButton variant="iconOnlyMedium" icon={<Icons.FilledHomeIcon width={20} height={20} />} onPress={() => {}} />
      <AppButton variant="iconOnlyMedium" icon={<Icons.FilledSettingsIcon width={20} height={20} />} onPress={() => {}} />
      <AppButton variant="iconOnlyMedium" icon={<Icons.StarIcon width={20} height={20} />} onPress={() => {}} />
      <AppButton variant="iconOnlyMedium" icon={<Icons.FilledHeartIcon width={20} height={20} />} onPress={() => {}} />

    </ScrollView>
  );
}
