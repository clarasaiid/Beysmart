/**
 * Bluetooth Manager Entry Point
 * 
 * Metro config (metro.config.js) handles BLE mocking:
 * - DISABLE_BLE=true → This file gets redirected to mockBluetoothManager (Expo Go)
 * - DISABLE_BLE=false → This file exports the real bluetoothmanager (EAS builds)
 * 
 * Components should always import from '../../src/ble' (this file)
 */

// This imports the REAL bluetooth manager
// Metro config will redirect this entire file to mock when DISABLE_BLE=true
export { default } from './bluetoothmanager';

