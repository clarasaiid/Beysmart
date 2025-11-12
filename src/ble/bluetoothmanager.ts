import * as ExpoDevice from "expo-device";
import { Alert, NativeEventEmitter, NativeModules, PermissionsAndroid, Platform } from "react-native";
import BleManager from "react-native-ble-manager";

interface BleDevice {
  id: string;
  name: string;
  rssi: number;
  advertising: any;
}

// Set up the BLE event emitter
const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

class BluetoothManager {
  private connectedDevice: BleDevice | null = null;
  private isScanning: boolean = false;

  constructor() {
    // Initialize BLE Manager
    BleManager.start({ showAlert: false })
      .then(() => console.log("✅ BLE Manager initialized"))
      .catch((error) => console.error("BLE init error:", error));
  }

  // ✅ Request permissions (Android only)
  async requestPermissions(): Promise<void> {
    try {
      if (Platform.OS === "android" && (ExpoDevice.platformApiLevel ?? 0) < 31) {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
      } else if (Platform.OS === "android" && (ExpoDevice.platformApiLevel ?? 0) >= 31) {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
      }
    } catch (error) {
      console.error("Permission request failed:", error);
    }
  }

  // ✅ Check if Bluetooth is enabled
  async isBluetoothEnabled(): Promise<boolean> {
    try {
      const state = await BleManager.checkState();
      return state === "on";
    } catch (error) {
      console.error("Error checking Bluetooth state:", error);
      return false;
    }
  }

  // ✅ Scan for nearby devices
  async scanForDevices(onDeviceFound: (device: BleDevice) => void): Promise<void> {
    try {
      await this.requestPermissions();

      const isEnabled = await this.isBluetoothEnabled();
      if (!isEnabled) {
        Alert.alert("Bluetooth Required", "Please enable Bluetooth to scan for devices.");
        return;
      }

      if (this.isScanning) {
        console.log("Already scanning...");
        return;
      }

      this.isScanning = true;
      console.log("🔍 Starting BLE scan...");

      // Start scanning
      await BleManager.scan([], 10, true);

      // Listen for discovered devices
      const handleDiscoverPeripheral = (device: any) => {
        if (device?.name) {
          console.log("📡 Found device:", device.name, device.id);
          onDeviceFound({
            id: device.id,
            name: device.name,
            rssi: device.rssi || 0,
            advertising: device.advertising,
          });
        }
      };

      bleManagerEmitter.addListener("BleManagerDiscoverPeripheral", handleDiscoverPeripheral);

      // Stop scanning after 10 seconds
      setTimeout(async () => {
        if (this.isScanning) {
          await BleManager.stopScan();
          bleManagerEmitter.removeAllListeners("BleManagerDiscoverPeripheral");
          this.isScanning = false;
          console.log("🛑 BLE scan stopped");
        }
      }, 10000);
    } catch (error) {
      console.error("BLE scanning error:", error);
      Alert.alert("Error", "Bluetooth scanning failed. Please try again.");
      this.isScanning = false;
    }
  }

  // ✅ Connect to a device
  async connectToDevice(deviceId: string): Promise<BleDevice | null> {
    try {
      console.log("🔗 Connecting to device:", deviceId);

      await BleManager.connect(deviceId);

      const connectedDevices = await BleManager.getConnectedPeripherals([deviceId]);
      if (connectedDevices && connectedDevices.length > 0) {
        this.connectedDevice = {
          id: connectedDevices[0].id,
          name: connectedDevices[0].name || "Unknown Device",
          rssi: connectedDevices[0].rssi || 0,
          advertising: connectedDevices[0].advertising,
        };

        console.log("✅ Connected to:", this.connectedDevice.name);
        return this.connectedDevice;
      }

      return null;
    } catch (error) {
      console.error("Connection error:", error);
      Alert.alert("Error", "Failed to connect to the device. Please try again.");
      return null;
    }
  }

  // ✅ Get connected device
  getConnectedDevice(): BleDevice | null {
    return this.connectedDevice;
  }

  // ✅ Retrieve services and characteristics from a connected device
  async retrieveServices(deviceId: string): Promise<any> {
    try {
      console.log("📋 Retrieving services for device:", deviceId);
      const peripheralInfo = await BleManager.retrieveServices(deviceId);
      console.log("✅ Services retrieved:", peripheralInfo);
      return peripheralInfo;
    } catch (error) {
      console.error("Error retrieving services:", error);
      throw error;
    }
  }

  // ✅ Write data to a characteristic
  async writeToCharacteristic(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
    data: number[]
  ): Promise<void> {
    try {
      console.log(`📤 Writing to characteristic: ${characteristicUUID}`);
      await BleManager.write(deviceId, serviceUUID, characteristicUUID, data);
      console.log("✅ Data written successfully");
    } catch (error) {
      console.error("Error writing to characteristic:", error);
      throw error;
    }
  }

  // ✅ Send WiFi credentials to device
  async sendWiFiCredentials(
    deviceId: string,
    ssid: string,
    password: string,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<boolean> {
    try {
      console.log("📡 Sending WiFi credentials to device...");
      
      // Create JSON payload
      const payload = JSON.stringify({
        ssid: ssid,
        password: password,
        timestamp: Date.now()
      });
      
      // Convert string to byte array
      const data = Array.from(payload).map(char => char.charCodeAt(0));
      
      await this.writeToCharacteristic(deviceId, serviceUUID, characteristicUUID, data);
      console.log("✅ WiFi credentials sent successfully");
      return true;
    } catch (error) {
      console.error("❌ Failed to send WiFi credentials:", error);
      return false;
    }
  }

  // ✅ Send ThingsBoard device token to device
  async sendDeviceToken(
    deviceId: string,
    token: string,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<boolean> {
    try {
      console.log("🔐 Sending device token to device...");
      
      // Create JSON payload
      const payload = JSON.stringify({
        token: token,
        server: "mqtt.thingsboard.cloud",
        port: 1883,
        timestamp: Date.now()
      });
      
      // Convert string to byte array
      const data = Array.from(payload).map(char => char.charCodeAt(0));
      
      await this.writeToCharacteristic(deviceId, serviceUUID, characteristicUUID, data);
      console.log("✅ Device token sent successfully");
      return true;
    } catch (error) {
      console.error("❌ Failed to send device token:", error);
      return false;
    }
  }

  // ✅ Read data from a characteristic
  async readFromCharacteristic(
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string
  ): Promise<number[] | null> {
    try {
      console.log(`📥 Reading from characteristic: ${characteristicUUID}`);
      const data = await BleManager.read(deviceId, serviceUUID, characteristicUUID);
      console.log("✅ Data read successfully:", data);
      return data;
    } catch (error) {
      console.error("Error reading from characteristic:", error);
      return null;
    }
  }

  // ✅ Disconnect from device
  async disconnect(): Promise<void> {
    if (this.connectedDevice) {
      try {
        await BleManager.disconnect(this.connectedDevice.id);
        console.log("🔌 Disconnected from:", this.connectedDevice.name);
        this.connectedDevice = null;
      } catch (error) {
        console.error("Disconnect error:", error);
      }
    }
  }

  // ✅ Stop scanning
  async stopScanning(): Promise<void> {
    if (this.isScanning) {
      try {
        await BleManager.stopScan();
        this.isScanning = false;
        console.log("🛑 BLE scan stopped");
      } catch (error) {
        console.error("Error stopping scan:", error);
      }
    }
  }

  // ✅ Cleanup
  destroy(): void {
    this.stopScanning();
    this.disconnect();
  }
}

export default new BluetoothManager();
