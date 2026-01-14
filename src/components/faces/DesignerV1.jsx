import React from 'react';
import { FaceRenderer } from '../engine/FaceRenderer';
import { DesignerFaceConfig } from './json/DesignerFace';

const DesignerV1 = () => {
    return <FaceRenderer face={DesignerFaceConfig} />;
};

export default DesignerV1;
