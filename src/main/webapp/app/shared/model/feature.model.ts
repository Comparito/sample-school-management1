import { IParent } from 'app/shared/model//parent.model';

export const enum FeatureType {
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

export interface IFeature {
  id?: number;
  name?: string;
  featureType?: FeatureType;
  parent?: IParent;
}

export const defaultValue: Readonly<IFeature> = {};
