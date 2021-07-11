export interface IModel {
    id: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type OptionalCreationAttributes = "id" | "status" | "createdAt" | "updatedAt" | "deletedAt";