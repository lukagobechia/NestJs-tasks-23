import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: Number })
  age: number;

  @Prop({ type: String })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
