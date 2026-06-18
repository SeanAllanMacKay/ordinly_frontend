import React from "react";
import { View } from "react-native";

import Mapbox from "@rnmapbox/maps";

import { mapStyles } from "./styles";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_KEY!);

export const Map = ({
  markers,
  center,
}: {
  markers?: [number, number][];
  center?: [number, number];
}) => {
  return (
    <View style={mapStyles.container}>
      <Mapbox.MapView style={mapStyles.map}>
        <Mapbox.Camera
          zoomLevel={center ? 15 : 0}
          centerCoordinate={center}
          animationDuration={0}
          animationMode={"none"}
        />

        {markers?.map((coordinate, index) => {
          return (
            <Mapbox.PointAnnotation
              id="worksite-marker"
              coordinate={coordinate}
            >
              <View style={mapStyles.markerContainer}>
                <View style={mapStyles.markerCircle} />
              </View>
            </Mapbox.PointAnnotation>
          );
        })}
      </Mapbox.MapView>
    </View>
  );
};
