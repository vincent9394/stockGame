import { KafkaService } from './kafka-service';
import { Request, Response } from 'express';

export class KafkaController {
    constructor(private kafkaService: KafkaService) { }
    pushToKafka = async (req: Request, res: Response) => {
        try {
            if (!req.body.x || !req.body.y || !req.body.timeInterval) {
                res.status(400).json({
                    result: false,
                    message: "req.body missing data"
                })
            } else {
                const messageStatus = await this.kafkaService.sendMessage(req.body.x, req.body.y, req.body.timeInterval);
                if (messageStatus != null) {
                    res.status(200).json({ result: true })
                } else {
                    res.status(500).json({
                        result: false,
                        message: "Failed to send Kafka message."
                    })
                }
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    searchToKafka = async (req: Request, res: Response) => {
        try {
            if (!req.body.x || !req.body.y || !req.body.timeInterval) {
                res.status(400).json({
                    result: false,
                    message: "req.body missing data"
                })
            } else {
                const messageStatus = await this.kafkaService.sendMessage(req.body.x, req.body.y, req.body.timeInterval);
                if (messageStatus != null) {
                    res.status(200).json({ result: true })
                } else {
                    res.status(500).json({
                        result: false,
                        message: "Failed to send Kafka message."
                    })
                }
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}